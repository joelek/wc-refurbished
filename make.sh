#!/bin/sh

source ./version.env

APP_VERSION="$MAJOR.$MINOR.$PATCH"

if [ $# -eq 1 ] && ([ $1 = "debug" ] || [ $1 = "release" ]); then
	echo "[building: $APP_VERSION-$1]"
else
	echo "usage: make <debug|release>"
	exit 1
fi

COMPILER="owcc"
COMPILER_OPTIONS=(
	"-std=c99"
	"-Wall"
	"-Wextra"
	"-O3"
	"-D APP_VERSION=\"$APP_VERSION\""
)

LINKER="owcc"
LINKER_OPTIONS=(
	"-b dos4g"
)

if [ $1 = "debug" ]; then
	COMPILER_OPTIONS+=(
		"-D DEBUG"
	)
fi

if [ $1 = "release" ]; then
	COMPILER_OPTIONS+=(
		"-Werror"
	)
	LINKER_OPTIONS+=(
		"-s"
	)
fi

SOURCES=()

TARGETS=(
	"wcrpatch.c"
)

rm -rf build/*

mkdir -p build/objects
mkdir -p build/targets

echo "[compiling]"
echo "[compiler: $COMPILER ${COMPILER_OPTIONS[@]}]"

SEP=\\
EXT=.exe

for i in ${SOURCES[@]} ${TARGETS[@]}; do
	echo "[compiling: source/$i]"
	mkdir -p $(dirname "build/objects/$i.o")
	$COMPILER ${COMPILER_OPTIONS[@]} -c source${SEP}$i -o build/objects/$i.o
	RETURN_CODE=$?
	if [ $RETURN_CODE -gt 0 ]; then
		echo "[failure]"
		exit 1;
	fi
done

OBJECTS=()

for i in ${SOURCES[@]}; do
	OBJECTS+=(
		"build/objects/$i.o"
	)
done

echo "[linking]"
echo "[linker: $LINKER ${LINKER_OPTIONS[@]}]"

for i in ${TARGETS[@]}; do
	echo "[linking: source/$i]"
	mkdir -p $(dirname "build/targets/$i")
	$LINKER ${LINKER_OPTIONS[@]} ${OBJECTS[@]} build${SEP}objects${SEP}$i.o -o build/targets/${i%.*}$EXT
	RETURN_CODE=$?
	if [ $RETURN_CODE -gt 0 ]; then
		echo "[failure]"
		exit 1;
	fi
done

if [ $1 = "release" ]; then
	rm -rf dist/*
	mkdir -p dist
	cp -R "build/targets/." "dist"
fi

echo "[success]"
