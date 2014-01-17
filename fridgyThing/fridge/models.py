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
#----------------Jacqui-----------------/\
#----------------Rujia-----------------\/
class ShoppingList (models.Model):
        item = models.CharField(max_length=200)
        note = models.CharField(max_length=500)
        def __unicode__(self):
                return self.item
        
#----------------Rujia-----------------/\
