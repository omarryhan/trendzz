<p align="center">
  <img src="https://github.com/omarryhan/trendzz/raw/master/public/logo_circular/512w/logo_circular.png" alt="Logo" title="Trendzz" height="250" width="250"/>
  <p align="center">
    <a href="https://app.netlify.com/sites/trendzz/deploys"><img alt="Build status" src="https://api.netlify.com/api/v1/badges/e36c5fe0-37d4-4190-903a-df004d01cef2/deploy-status"></a>
    <a href="https://github.com/omarryhan/trendzz"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"></a>
  </p>
</p>

# Trendzz

Github trending PWA focusing on usability.

## Live website

https://trendzz.netlify.app

## Known issues

If you're having trouble seeing the bottom select row, you can either:

- Add the app to your homescreen and open it again, this will correctly show the full height (`100vh`).
- Try pulling the header upwards.

I think browsers should always show `100vh` regardless whether the user has started scrolling down or not.
Firefox doesn't seem to have this issue. Chrome and Chromium based browsers do. Yay Firefox.

Some browser disallows access to indexed db in Incognito

## Thanks

To: [Hu Chen](https://github.com/huchenme) for providing the [API](https://github.com/huchenme/github-trending-api) for this project.
