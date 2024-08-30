echo "Switching to the 'master' branch"
git checkout master

echo "Building the app.."
npm run build

echo "Deploying the app.."
scp -R build/* Reservation@https://rezervace.buk.cvut.cz:/var/www/https://rezervace.buk.cvut.cz/

echo "Done!"
