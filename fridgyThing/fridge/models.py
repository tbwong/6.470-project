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
#----------------Tiff-----------------/\
#----------------Jacqui-----------------\/
#----------------Jacqui-----------------/\
#----------------Rujia-----------------\/
#----------------Rujia-----------------/\