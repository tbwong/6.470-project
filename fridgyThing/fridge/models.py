from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django import forms

# Create your models here.
#----------------Pav-----------------\/
class Ingredient(models.Model):
	user = models.ForeignKey()
	name = models.CharField(max_length=200)
	pic = models.CharField(max_length=200)
	def __unicode__(self):
		return self.name
		
#----------------Pav-----------------/\
#----------------Tiff-----------------\/
class Calories(models.Model):
	amount = models.IntegerField(default=0)
	eaten_date = models.DateTimeField('date published')

class Carbs(models.Model):
	amount = models.IntegerField(default=0)
	eaten_date = models.DateTimeField('date published')

class Fats(models.Model):
	amount = models.IntegerField(default=0)
	eaten_date = models.DateTimeField('date published')

class Protein(models.Model):
	amount = models.IntegerField(default=0)
	eaten_date = models.DateTimeField('date published')

class Sodium(models.Model):
	amount = models.IntegerField(default=0)
	eaten_date = models.DateTimeField('date published')

class Sugar(models.Model):
	amount = models.IntegerField(default=0)
	eaten_date = models.DateTimeField('date published')

#----------------Tiff-----------------/\
#----------------Jacqui-----------------\/

class Pictures(models.Model):
	picture = models.ImageField(upload_to = 'scrapbook_uploads', default = 'static/scrapbook/images/no_pic_uploaded.jpg');
	date = models.DateTimeField('date published', auto_now=True)
	caption = models.TextField(blank = True)
	def __unicode__(self):
		return self.caption

#----------------Jacqui-----------------/\
#----------------Rujia-----------------\/)
        def __unicode__(self):
                return self.item
class ShoppingList (models.Model):
        item = models.CharField(max_length=200)
        note = models.CharField(max_length=500
        
#----------------Rujia-----------------/\
