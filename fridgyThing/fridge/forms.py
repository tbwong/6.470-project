#from django import forms
from django.forms import ModelForm
from fridge.models import Pictures
from django import forms            
from django.contrib.auth.models import User   # fill in custom user info then save it 
from django.contrib.auth.forms import UserCreationForm      

"""
class ImageUploadForm(ModelForm):
    class Meta:
        model = Pictures
        fields = ['picture']
"""

class ImageUploadForm(ModelForm):
	class Meta:
		model = Pictures
		fields = ["picture", "caption", "title"]
		widgets = {
            'caption': forms.TextInput(attrs={'class': 'form-control'}),
            'caption': forms.TextInput(attrs={'placeholder': 'Caption'}),
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'title': forms.TextInput(attrs={'placeholder': 'Title'})
        }

