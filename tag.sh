PACKAGE_VERSION=$(node -pe "require('./package.json').version")
git tag -a "v$PACKAGE_VERSION" -m "version $PACKAGE_VERSION"
git push v$PACKAGE_VERSION
