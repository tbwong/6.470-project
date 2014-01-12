from django.shortcuts import render, get_object_or_404
from fridge.models import Ingredient 
# Create your views here.
def index(request):
	return render(request, 'fridge/index.html')
def app(request):
	ingredients = Ingredient.objects.all() 
	return render(request, 'fridge/layout.html', {'ingredients':ingredients} )
