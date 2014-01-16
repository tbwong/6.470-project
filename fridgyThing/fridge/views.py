from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,HttpResponseRedirect
from django.core.urlresolvers import reverse
from fridge.models import Ingredient 
from fridge.models import Calories, Carbs, Fats, Protein, Sodium, Sugar
# Create your views here.

#----------------Pav-----------------\/
def index(request):
	return render(request, 'fridge/index.html')
def showFridge(request):
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
	calorieObjects = Calories.objects.all()
	carbObjects = Carbs.objects.all()
	fatObjects = Fats.objects.all()
	proteinObjects = Protein.objects.all()
	sodiumObjects = Sodium.objects.all()
	sugarObjects = Sugar.objects.all()


	calories = [x.amount for x in Calories.objects.all()]
	carbValues = [x.amount for x in Carbs.objects.all()]
	fatValues = [x.amount for x in Fats.objects.all()]
	proteinValues = [x.amount for x in Protein.objects.all()]
	sodiumValues = [x.amount for x in Sodium.objects.all()]
	sugarValues = [x.amount for x in Sugar.objects.all()]
	currentDates = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
	return render(request, 'graphs/graphs.html',{'cal':calories,
												'carbs': carbValues,
												'fat':fatValues,
												'protein': proteinValues,
												'sodium': sodiumValues,
												'sugar': sugarValues,
												'dates': currentDates
												})
#----------------Tiff-----------------/\
#----------------Jacqui-----------------\/

def showScrapbookPage(request):
       items = 0
       return render(request, 'scrapbook/scrapbook.html', {'item':items})

#----------------Jacqui-----------------/\



#----------------Rujia-----------------\/
def showShoppingPage(request):
        items = 0
        return render(request, 'shopping/shopping.html', {'item':items})
#----------------Rujia-----------------/\
