rm -r static
rm -r index.html
cp -r ../../dist/static .
cp ../../dist/index.html .
git add .
git commit -m "commit"
git push