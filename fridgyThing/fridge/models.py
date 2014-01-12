from django.db import models

# Create your models here.

class Ingredient(models.Model):
	name = models.CharField(max_length=200)
	pic = models.ImageField(upload_to='ingredientImages')
	def __unicode__(self):
		return self.name