from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django import forms

# Create your models here.
#----------------Pav-----------------\/
class Ingredient(models.Model):
	user = models.ForeignKey(User)
	name = models.CharField(max_length=200)
	pic = models.CharField(max_length=200)
	def __unicode__(self):
		return self.name
		
#----------------Pav-----------------/\
#----------------Tiff-----------------\/
class Calories(models.Model):
	user = models.ForeignKey(User)
	amount = models.IntegerField(default=0)
	eaten_date = models.DateTimeField('date published')
	def __unicode__(self):
		return str(self.user.username)+':'+str(self.amount)

class Carbs(models.Model):
	user = models.ForeignKey(User)
	amount = models.IntegerField(default=0)
	eaten_date = models.DateTimeField('date published')
	def __unicode__(self):
		return str(self.user.username)+':'+str(self.amount)

class Fats(models.Model):
	user = models.ForeignKey(User)
	amount = models.IntegerField(default=0)
	eaten_date = models.DateTimeField('date published')
	def __unicode__(self):
		return str(self.user.username)+':'+str(self.amount)

class Protein(models.Model):
	user = models.ForeignKey(User)
	amount = models.IntegerField(default=0)
	eaten_date = models.DateTimeField('date published')
	def __unicode__(self):
		return str(self.user.username)+':'+str(self.amount)

class Sodium(models.Model):
	user = models.ForeignKey(User)
	amount = models.IntegerField(default=0)
	eaten_date = models.DateTimeField('date published')
	def __unicode__(self):
		return str(self.user.username)+':'+str(self.amount)

class Sugar(models.Model):
	user = models.ForeignKey(User)
	amount = models.IntegerField(default=0)
	eaten_date = models.DateTimeField('date published')
	def __unicode__(self):
		return str(self.user.username)+':'+str(self.amount)

class Characteristics(models.Model):
	user = models.ForeignKey(User)
	age = models.IntegerField(default=0)
	body_weight = models.IntegerField(default=0)
	gender = models.CharField(max_length = 200)
	height = models.IntegerField(default=0)

#----------------Tiff-----------------/\
#----------------Jacqui-----------------\/

class Pictures(models.Model):
	user = models.ForeignKey(User)
	picture = models.ImageField(upload_to = 'scrapbook_uploads', default = 'static/scrapbook/images/no_pic_uploaded.jpg');
	date = models.DateTimeField('date published', auto_now=True)
	caption = models.CharField(max_length = 100, blank = True, help_text = "Tack on a title!")
	title = models.CharField(max_length = 100, blank = True, help_text="Add dat comment!") #New
	def __unicode__(self):
		return self.caption

#----------------Jacqui-----------------/\
#----------------Rujia-----------------\/)
        
class ShoppingList (models.Model):
		user = models.ForeignKey(User)
		item = models.CharField(max_length=200)
		note = models.CharField(max_length=500)
		def __unicode__(self):
			return self.item
        
#----------------Rujia-----------------/\
