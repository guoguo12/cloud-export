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

### Authentication workaround

Cloud Export uses an offical Kloudless [authentication script](https://github.com/Kloudless/authenticator.js/) to connect users to their storage services. The user clicks on a button, triggering a pop-up that asks them to sign in to the cloud service of their choice. 

Normally, this button would be part of the add-on user interface. However, the authentication script currently doesn't work within the add-on. As a result, Kloudless authentication for Cloud Export is handled on a [separate page](http://allenguo.us/projects/cloud-export/authenticate.html).

Why doesn't the Kloudless authentication script work within the add-on? Prior to deployment, the add-on code is sanitized and sandboxed using Google's [Caja Compiler](https://code.google.com/p/google-caja/). It is likely that the sanitization process is preventing the authentication script from working properly.

It is not known whether handling authentication on a completely separate page poses a security risk for users.

### API key safety

Every Kloudless app has an API key, which is meant to be kept secret.

Cloud Export includes its API key in its main code file, `Code.gs` (called `Code.js` in this repo). As far as I can tell, `Code.gs` is not directly visible to users, and all requests made with the API key are made from Google's servers. However, it is not clear whether this is actually the case.

Development
-----------

Because of the potential security risks, I do not plan to complete Cloud Export or submit it for publication.

I hope that this repository will nonetheless be useful to developers interested in building their own Google Docs add-ons or Kloudless apps.

That said, if you're looking for a completed Google Docs add-on that *has* been successfully published, check out [URL Shortener](https://github.com/guoguo12/url-shortener).

Credits
-------

Without the following, Cloud Export would not exist:
* [Kloudless](https://developers.kloudless.com) (and [authenticator.js](https://github.com/Kloudless/authenticator.js/))
* [jQuery](https://jquery.com/)
* [Bootstrap](http://getbootstrap.com/)
* [Animate.css](https://daneden.github.io/animate.css/)
