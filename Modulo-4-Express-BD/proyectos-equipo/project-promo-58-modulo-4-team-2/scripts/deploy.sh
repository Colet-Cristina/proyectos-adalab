rm -rf frontend-static 
cd FRONTEND-REACT
npm run build
mv dist ../frontend-static
git add ../frontend-static
git commit -m 'Add new version of React.'
git push