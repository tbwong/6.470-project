from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from fridge.models import Ingredient 
# Create your views here.
def index(request):
	return render(request, 'fridge/index.html')
def app(request):
	ingredients = Ingredient.objects.all() 
	return render(request, 'fridge/layout.html', {'ingredients':ingredients} )
def processing(request):
	#do something
	return HttpResponse(status=204) #pass back to the page without changing it