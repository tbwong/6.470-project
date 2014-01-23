#from django import forms
from django.forms import ModelForm
from fridge.models import Pictures

class ImageUploadForm(ModelForm):
	class Meta:
		model = Pictures
		fields = ['picture']

	