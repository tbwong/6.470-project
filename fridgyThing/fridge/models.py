from django.db import models
from django.conf import settings

# Create your models here.
#----------------Pav-----------------\/
class Ingredient(models.Model):
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


class Fats(models.Model):


class Protein(model.Model):


class Sodium(model.Model):


class Sugar(model.Model):


#----------------Tiff-----------------/\
#----------------Jacqui-----------------\/
#----------------Jacqui-----------------/\
#----------------Rujia-----------------\/
#----------------Rujia-----------------/\