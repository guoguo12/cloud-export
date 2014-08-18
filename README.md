Cloud Export
============

**Cloud Export** is a [Google Docs add-on](https://developers.google.com/apps-script/quickstart/docs) for exporting documents directly from Google Docs to cloud storage services like Dropbox and Bitcasa.

Current features
----------------

* Runs directly inside Google Docs as an add-on
* Known to work with Bitcasa, Box, Copy, and Dropbox
* Easy and secure authentication via the [Kloudless](https://developers.kloudless.com/) cloud storage platform

Live demo
---------

Cloud Export has not been published to the Google Docs add-on store. This means it cannot be installed.

However, you can try Cloud Export in its unpublished form by clicking [here](https://docs.google.com/document/d/1qEZRMym7Jj-mqunRyohBKLhYac3kY6QsVUKBJ73lxNg/edit?usp=sharing) and following the instructions below:

1. Sign in with your Google account
2. Click **File > Make a copy...** to copy the document (with the add-on) to your account
3. In your copy, click **Add-ons > Copy of Cloud Export > Export current document...**
4. After granting Cloud Export access to your document, follow the instructions to export your document to an external cloud storage service

Please note the following:
* The Kloudless app ID and API key for this demo app are visible to the public. This means that any accounts you authorize could potentially be manipulated by others.
* For your own safety, you should create and use a separate Dropbox/Copy/Bitcasa account for testing. **Do not use your personal account!**
* On the other hand, it *is* safe to use your personal Google account for testing or development.

To view the add-on source code, click **Tools > Script editor...**. The files shown should be identical to the ones in this repository (in the `app` directory), except that the Kloudless app ID and API key have been hidden in this repository.

If you make changes to the authorization page, replace `http://allenguo.us/projects/cloud-export/authenticate.html` with your own URL in line 3 of `AuthDialog.html`.

Issues
------

Coming soon.

Credits
-------

Without the following, Cloud Export would not exist:
* [Kloudless](https://developers.kloudless.com) (and [authenticator](https://github.com/Kloudless/authenticator.js/))
* [jQuery](https://jquery.com/)
* [Bootstrap](http://getbootstrap.com/)
* [Animate.css](https://daneden.github.io/animate.css/)
