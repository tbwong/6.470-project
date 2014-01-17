from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,HttpResponseRedirect
from django.core.urlresolvers import reverse
<<<<<<< HEAD
from fridge.models import Ingredient, ShoppingList
=======
from fridge.models import Ingredient, Pictures
>>>>>>> 0b922416a4a99b10a7d237a93c838dee29f85ac3
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
	calories = [x.amount for x in Calories.objects.all()]
	carbValues = [x.amount for x in Carbs.objects.all()]
	fatValues = [x.amount for x in Fats.object.all()]
	proteinValues = [x.amount for x in Protein.object.all()]
	sodiumValues = [x.amount for x in Sodium.object.all()]
	sugarValues = [x.amount for x in Sugar.object.all()]
	currentDates = [x.date for x in Calories.objects.all()]
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
       pictures = [x.picture for x in Pictures.objects.all()]
       date = [x.date for x in Pictures.objects.all()]
       caption = [x.caption for x in Pictures.objects.all()]
       return render(request, 'scrapbook/scrapbook.html', {'pictures':pictures, 'date':date, 'caption':caption})

#----------------Jacqui-----------------/\



#----------------Rujia-----------------\/
def showShoppingPage(request):
        itemslist = [x.item for x in ShoppingList.objects.all()]
        memolist = [x.note for x in ShoppingList.objects.all()]
        return render(request, 'shopping/shopping.html', {'itemslist':itemslist, 'memolist':memolist})


def addItem(request):
	try:
		ItemName = request.POST['ItemName']
		ItemName.strip()
		# IngAmount = float(request.POST['IngAmount']) what.
		i = ShoppingList(item=ItemName,note='')
		i.save();
	except:
		#nothing
		i=1
	else:
		return HttpResponseRedirect(reverse('fridge:appPage',args=()))
#----------------Rujia-----------------/\
