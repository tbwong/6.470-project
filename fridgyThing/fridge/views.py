from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,HttpResponseRedirect
from django.core.urlresolvers import reverse
from fridge.models import Ingredient, Calories, Carbs, Fats, Protein, Sodium, Sugar, ShoppingList,Pictures
import requests,re, json
from forms import ImageUploadForm;
from django.utils import timezone;

# Create your views here.

#----------------Pav-----------------\/
def index(request):
	return render(request, 'fridge/index.html')
def showFridge(request):
	ingredients = Ingredient.objects.all() 
	return render(request, 'fridge/layout.html', {'ingredients':ingredients} )


def addIngredient(request):
	IngName = request.POST['IngName']
	IngName.strip()
	# IngAmount = float(request.POST['IngAmount'])
	i = Ingredient(name=IngName,pic='search')
	i.save();
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

def getRecipes(request):
 	url ='http://api.yummly.com/v1/api/recipes?_app_id=ccb5dd3c&_app_key=8f8f5a9fd5023ce15ea82f24ee8aac14&q=?&noUserSettings=true'
 	ings = Ingredient.objects.all()
 	for i in range(len(ings)):
 		temp = ings[i].name
 		temp = re.sub('/ /g', '',temp).lower()
 		url = url+'&allowedIngredient='+temp
 	url= url+'&excludedIngredient=salt&maxTotalTimeInSeconds=Any+time&flavor.salty=+&flavor.savory=+&flavor.sour=+&flavor.bitter=+&flavor.sweet=+&flavor.spicy=+&nutrition.cholesterol=+&nutrition.fat=+&nutrition.calories=+&nutrition.carbs=+&imagesOnly=true&blogsOnly=false&sortBy=relevance'
	rec = requests.get(url)

	temp = json.dumps(rec.json())
	dct = json.loads(temp)
	matches = dct['matches']
	recipeNames = []
	recipeIngs = []
	recipeIms = [] 
	count=0

	for match in matches:
		recipeNames.append(match['recipeName'])
		recipeIngs.append(match['ingredients'])
		recipeIms.append(match['smallImageUrls'][0])

	recipe = zip(recipeNames,recipeIngs,recipeIms)

	ingredients = Ingredient.objects.all() 

	return render(request, 'fridge/layout.html', {'ingredients':ingredients,'url':url,'recipe':recipe} )



#----------------Pav-----------------/\
#----------------Tiff-----------------\/
def showGraphsPage(request):
	#calories,carbs,fat,protein,sodium,sugar
	calories = [x.amount for x in Calories.objects.all()]
	carbValues = [x.amount for x in Carbs.objects.all()]
	fatValues = [x.amount for x in Fats.objects.all()]
	proteinValues = [x.amount for x in Protein.objects.all()]
	sodiumValues = [x.amount for x in Sodium.objects.all()]
	sugarValues = [x.amount for x in Sugar.objects.all()]
#	currentDates = [datetime.strptime(str(x.eaten_date), '%Y-%m-%d %H:%M:%S+00:00').date() for x in Calories.objects.all()]
	return render(request, 'graphs/graphs.html',{'cal':calories,
												'carbs': carbValues,
												'fat':fatValues,
												'protein': proteinValues,
												'sodium': sodiumValues,
												'sugar': sugarValues
												})
#----------------Tiff-----------------/\
#----------------Jacqui-----------------\/
def showScrapbookPage(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            m = Pictures(picture = request.FILES['image'],date = timezone.now(), caption = "") #
         #   m.model_pic = form.cleaned_data['image']
            m.save()
    scrapbook_gen = Pictures.objects.all()
    url = [x.picture.url.replace("fridge/static/", "") for x in Pictures.objects.all()]
    return render(request, 'scrapbook/scrapbook.html', {'scrapbook_gen':scrapbook_gen, 'url': url})






"""
def addImage(request):
    try:
    	if request.method == 'POST':
        	form = ImageUploadForm(request.POST, request.FILES)
        	if form.is_valid():
        		m = Pictures(date = timezone.now(), caption = "")
         		#   m.model_pic = form.cleaned_data['image']
         		m.save()
         	return HttpResponse('Successfully added image!')
    except:
    	m = 1
    	raise
    else:
   		return HttpResponseRedirect(reverse('fridge:showScrapbookPage', args = ()))


def addImage(request):
	if request.method == 'POST':
		form = ImageUploadForm(request.POST, request.FILES)
		if form.is_valid():
			m = Pictures(date = timezone.now(), caption = "")
         		#   m.model_pic = form.cleaned_data['image']
         		m.save()
         		return HttpResponse('Successfully added image!') 
	return HttpResponseForbidden('Allowed only via POST :( ')
	else:
		picture = [x.picture for x in Pictures.objects.all()]	
		date = [x.date for x in Pictures.objects.all()]
		caption = [x.caption for x in Pictures.objects.all()]
		return render(request, 'scrapbook/scrapbook.html', {'picture':picture, 'date':date, 'caption':caption})

     
def showScrapbookPage(request):
	picture = [x.picture for x in Pictures.objects.all()]
	date = [x.date for x in Pictures.objects.all()]
	caption = [x.caption for x in Pictures.objects.all()]
	return render(request, 'scrapbook/scrapbook.html', {'picture': picture, 'date':date, 'caption':caption})
"""

#----------------Jacqui-----------------/\



#----------------Rujia-----------------\/
def showShoppingPage(request):
	itemslist = [(x.id, x.item) for x in ShoppingList.objects.all()]
	memolist = [(x.id, x.note) for x in ShoppingList.objects.all()]
	genlist = ShoppingList.objects.all()
	if ShoppingList.objects.all()[0].id != 1:
		other = ShoppingList(item ='', note='', id=1)
		other.save()
	else:
		other = ShoppingList.objects.get(id=1).note
#		genlist.remove(0)
	return render(request, 'shopping/shopping.html', {'genlist':genlist, 'other':other})


def addItem(request):
	try:
		Item = request.POST['ItemName']
		i = ShoppingList(item=Item,note=' ')
		i.save();
	except:
		#nothing
		i=1
		raise
	else:
		return HttpResponseRedirect(reverse('fridge:showShopping',args=()))

def removeItem(request):
	try:
		Item = request.POST['ItemId']
		i = ShoppingList.objects.get(id=Item)
		i.delete();
	except:
		#nothing
		i=1
		raise
	else:
		return HttpResponseRedirect(reverse('fridge:showShopping',args=()))

def replaceItem(request):
	try:
		NewItem = request.POST['NewItem']
		ItemId = request.POST["ItemId"]
		i = ShoppingList.objects.get(id=ItemId)
		i.item = NewItem
		i.save()
	except:
		#nothing
		i=1
		raise
	else:
		return HttpResponseRedirect(reverse('fridge:showShopping',args=()))
		
def removeNote(request):
	try:
		Note = request.POST['NoteId']
		i = ShoppingList.objects.get(id=Note)
		i.note = ''
		i.save()
	except:
		#nothing
		i=1
		raise
	else:
		return HttpResponseRedirect(reverse('fridge:showShopping',args=()))

def replaceNote(request):
	try:
		NewNote = request.POST['NewNote']
		NoteId = request.POST["NoteId"]
		i = ShoppingList.objects.get(id=NoteId)
		i.note = NewNote
		i.save()
	except:
		#nothing
		i=1
		raise
	else:
		return HttpResponseRedirect(reverse('fridge:showShopping',args=()))
		
def genNote(request):
	try:
		genNote = request.POST['other']
		i = ShoppingList.objects.get(id=1)
		i.note = genNote
		i.save()
	except:
		#nothing
		i=1
		raise
	else:
		return HttpResponseRedirect(reverse('fridge:showShopping',args=()))
		
	
#----------------Rujia-----------------/\
