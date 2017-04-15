"""Spot server : ) """


import os

from flask import Flask, render_template, redirect, request, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)


app.secret_key = "19kittiesareawesome89"



@app.route('/')
def localhost():


	return render_template("main.html")



if __name__ == "__main__":

	app.debug = True

	# Use the DebugToolbar
	DebugToolbarExtension(app)
	app.run()