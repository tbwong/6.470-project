from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,HttpResponseRedirect
from django.core.urlresolvers import reverse
from fridge.models import Ingredient 
# Create your views here.

#----------------Pav-----------------\/
def index(request):
	return render(request, 'fridge/index.html')
def app(request):
	ingredients = Ingredient.objects.all() 
	return render(request, 'fridge/layout.html', {'ingredients':ingredients} )


def addIngredient(request):
	try:
		IngName = request.POST['IngName']
		IngName.strip()
		# IngAmount = float(request.POST['IngAmount'])
		i = Ingredient(name=IngName,pic='search')
		i.save();
	except:
		#nothing
		i=1
	else:
		return HttpResponseRedirect(reverse('fridge:appPage',args=()))

#----------------Pav-----------------/\
#----------------Tiff-----------------\/
def showGraphsPage(request):
	#calories,carbs,fat,protein,sodium,sugar
	calories = [100,20,30,40]
	carbValues = [100,20,30,40]
	fatValues = [20,40,50]
	proteinValues = [100,20,30,40]
	sodiumValues = [100,20,30,40]
	sugarValues = [100,20,30,40]

	return render(request, 'graphs/graphs.html',{'cal':calories,
												'fat':fatValues,
												
												})
#----------------Tiff-----------------/\
#----------------Jacqui-----------------\/
#----------------Jacqui-----------------/\
#----------------Rujia-----------------\/
def showShoppingPage(request):
        items = 0
        return render(request, 'shopping/shopping.html', {'item':items})
#----------------Rujia-----------------/\
