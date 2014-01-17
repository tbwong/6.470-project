from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,HttpResponseRedirect
from django.core.urlresolvers import reverse
from fridge.models import Ingredient,ShoppingList#, Pictures
import requests,re

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

# function getRecipies(Ingredients){
# 	var url ='http://api.yummly.com/v1/api/recipes?_app_id=ccb5dd3c&_app_key=8f8f5a9fd5023ce15ea82f24ee8aac14&q=?&requirePictures=true&maxTotalTimeInSeconds=3'
# 	var i =1;
# 	for(i;i<Ingredients.length;i++){
# 		url = url+'&allowedIngredient[]='+Ingredients[i].replace(/ /g, '');
# 	}
# 	$.ajax({
# 		url: url,
# 		dataType: "jsonp",
# 		success: function (data) {
# 			console.log(data)
# 			alert(data);
# 		}
# 	});
# }
def getRecipies(Ingredients):
 	url ='http://api.yummly.com/v1/api/recipes?_app_id=ccb5dd3c&_app_key=8f8f5a9fd5023ce15ea82f24ee8aac14&q=?&requirePictures=true&maxTotalTimeInSeconds=3'
 	ings = Ingredient.objects.all()
 	for i in range(len(ings)):
 		temp = ings[i].name
 		temp = re.sub('/ /g', '',temp)
 		url = url+'&allowedIngredient[]='+temp
	rec = requests.get(url)




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
        itemslist = [x.item for x in ShoppingList.objects.all()]
        memolist = [x.note for x in ShoppingList.objects.all()]
        return render(request, 'shopping/shopping.html', {'itemslist':itemslist, 'memolist':memolist})


def addItem(request):
	try:
		ItemName = request.POST['ItemName']
		ItemName.strip()
		i = ShoppingList(item=ItemName,note='')
		i.save();
	except:
		#nothing
		i=1
	else:
		return HttpResponseRedirect(reverse('fridge:showShopping',args=()))
	
#----------------Rujia-----------------/\
