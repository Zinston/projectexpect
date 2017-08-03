# Project Expect
[_Project Expect_](https://project-expect.herokuapp.com/) is a simple single page Todo app where you set your expectations for each task. A task is complete when each expectation is met. It was inspired by the [Jasmine](https://jasmine.github.io/) testing workflow.

## Installation
* Clone this repository : `git clone https://github.com/Zinston/projectexpect.git`
* Install all required Python packages with [pip](https://pypi.python.org/pypi/pip) : `pip install -r requirements.txt`
* Add the following line to the very end of `manage.py` : `app.run(host='0.0.0.0', port=5000)`
* Create credentials on [Google Console](console.developers.google.com) and save the output json file to `/client_secrets.json`
* Create a MongoDB database on [mLab](https://www.mlab.com)
* Create `/mongo_secrets.json` with the following content : `{"user":"<your-mongodb-username>","password":"<your-mongodb-password>"}`
* Run `manage.py` : `python manage.py`
* The app is running on 0.0.0.0:5000

## Usage
* Add tasks by filling the main input field.
* Add expectations for each task by filling each task's input field.
* Complete expectations by clicking on the _v_ icon next to them.
* Delete tasks and expectations by clicking on the _x_ icon next to them.
* Edit tasks and expectations by simply clicking on their name, editing, then pressing _ENTER_ when you're done.

## Features
* Add tasks
* Add expectations
* Edit and delete tasks and expectations
* Complete expectations
* Tasks complete automatically when all its expectations are completed
* Login with Google Plus and persist your session in the database

## License
_Project Expect_ is released under the [MIT license](projectexpect/LICENSE.txt).