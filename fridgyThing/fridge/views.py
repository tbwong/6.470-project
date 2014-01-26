from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,HttpResponseRedirect
from django.core.urlresolvers import reverse
from fridge.models import Ingredient, Calories, Carbs, Fats, Protein, Sodium, Sugar, ShoppingList,Pictures,User,Characteristics
import requests,re,json
from django.views.generic.base import RedirectView
from forms import ImageUploadForm;
from django.utils import timezone;
from django.shortcuts import render_to_response
from django.contrib.auth import authenticate, login, logout
from django.core.context_processors import csrf
from django.contrib import auth                 
from django.shortcuts import render_to_response
from django.contrib.formtools.wizard.views import SessionWizardView
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import os
from django.contrib.auth.models import User
import datetime
# Create your views here.


#----------------Pav-----------------\/
def index(request):
	return render(request, 'fridge/index.html')
def showFridge(request,userID):
	ingredients = Ingredient.objects.filter(user=User.objects.get(pk=userID)) 
	return render(request, 'fridge/layout.html', {'ingredients':ingredients,'userID':userID} )

def addIngredient(request):
	IngName = request.POST['IngName']
	userID = request.POST['userID']
	IngName.strip()
	IngName= IngName.lower();
	# IngAmount = float(request.POST['IngAmount'])
	i = Ingredient(name=IngName,pic='search',user=User.objects.get(pk=userID))
	i.save();
	return HttpResponseRedirect(reverse('fridge:appPage',args=(userID,)))
def delIngredient(request):
	IngName = request.POST['IngNames']
	userID = request.POST['userID']
	IngName.strip()
	# IngAmount = float(request.POST['IngAmount'])
	i = Ingredient.objects.get(name=IngName.lower(),user=User.objects.get(pk=userID))
	i.delete();
	return HttpResponseRedirect(reverse('fridge:appPage',args=(userID,)))

def getRecipes(request,userID):
 	url ='http://api.yummly.com/v1/api/recipes?_app_id=11cf413b&_app_key=7904cfbaa445d431246c18249bc5174e&q='
 	url= url+'&requirePictures=true'
 	ings = Ingredient.objects.all()
 	matchSet= []

 	for i in range(len(ings)):
 		temp = ings[i].name
 		temp = re.sub('/ /g', '',temp).lower()
 		url2 = url+'&allowedIngredient[]='+temp
		try:
			
			rec = requests.get(url2)

			temp = json.dumps(rec.json())
			dct = json.loads(temp)
		except:
			return HttpResponse('Max API calls reached')
		matchSet.append(dct['matches'])
 	
	recipeNames = []
	recipeIngs = []
	recipeIms = [] 
	recipeIds = []
	inFrjCount = []
	count=0
	for matches in matchSet:
		for match in matches:
			recipeNames.append(match['recipeName'][0:25]+'...')
			recipeIngs.append(match['ingredients'])
			recipeIms.append(match['smallImageUrls'][0])
			recipeIds.append(match['id'])
			inFrjCounter = 0
			print match['ingredients']
			print '----'
			for ing in ings:
				for s in match['ingredients']:
					if ing.name.lower() in s.lower():
						inFrjCounter=inFrjCounter+1
			inFrjCount.append(inFrjCounter)
			print inFrjCounter

	recipe = zip(recipeNames,recipeIngs,recipeIms,recipeIds,inFrjCount)
	recipe = sorted(recipe,key=lambda recipe:recipe[4],reverse=True)

	ingredients = Ingredient.objects.all() 

	return render(request, 'fridge/layout.html', {'ingredients':ingredients,'url':url,'recipe':recipe,'userID':userID})

def makeMeal(request):
	userID = request.POST['userID']
	recipeID = request.POST['recipeID']
	# url ='http://api.yummly.com/v1/api/recipes?_app_id=ccb5dd3c&_app_key=8f8f5a9fd5023ce15ea82f24ee8aac14&q='
	url ='http://api.yummly.com/v1/api/recipe/'+recipeID+'?_app_id=11cf413b&_app_key=7904cfbaa445d431246c18249bc5174e'
	rec = requests.get(url)
	temp = json.dumps(rec.json())
	dct = json.loads(temp)
	nutrition = dct['nutritionEstimates'] # cal,carb,fat,protein,sodium,sugar
	
	nutrients = []
	nutrients.append(nutrition[0]) # calories # unit is in kcal 
	nutrients.append(nutrition[6]) # carbs  # unit for all others is grams
	nutrients.append(nutrition[1]) # fat
	nutrients.append(nutrition[9]) # protein
	nutrients.append(nutrition[4]) # sodium
	nutrients.append(nutrition[8]) # sugar

	nutrientObjects = [Calories,Carbs,Fats,Protein,Sodium,Sugar]

	for i in range(len(nutrients)):
		cur = nutrientObjects[i].objects.filter(user=User.objects.get(pk=userID))
		added = False;
		for c in cur:
			if(c.eaten_date.date() == timezone.now().date()):
				c.amount+=nutrients[i]['value']
				c.save();
				added = True
		if (not added):
			c = nutrientObjects[i](user=User.objects.get(pk=userID),amount=nutrients[i]['value'],eaten_date=timezone.now())
			c.save();

	return HttpResponseRedirect(reverse('fridge:appPage',args=(userID,)))


def addShopping(request):
	userID = request.POST['userID']
	ings = request.POST.getlist('ingsList')
	for j in ings:
		i = ShoppingList(item=j,note=' ',user=User.objects.get(pk=userID))
		i.save();
	return HttpResponseRedirect(reverse('fridge:showShopping',args=(userID,)))

def register(request):
	username = request.POST['username']
	password = request.POST['password']
	age = request.POST['age']
	weight = request.POST['weight']

	try:
		user = User.objects.create_user(username, 'lennon@thebeatles.com', password)
		char = Characteristics(user=user,age=age,body_weight=weight)
		char.save()
	except:
		return HttpResponse('<h2>Either this user already exists or you\'re trying to mess with us.</h2>')

	return HttpResponseRedirect(reverse('fridge:index',args=()))

#----------------Pav-----------------/\
#----------------Tiff-----------------\/
def my_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
			login(request, user)
			userID = user.pk;
			#raise Exception("I know python!")
			return HttpResponseRedirect(reverse('fridge:appPage',args=(userID,)))
        else:
            # Return a 'disabled account' error message
            return HttpResponse('There is a problem with your account. Contact us.')
    else:
        # Return an 'invalid login' error message.
       return HttpResponse('Wrong username or password')


def logout_view(request):
    logout(request)
    # Redirect to a success page.
    return HttpResponseRedirect(reverse('fridge:index',args=()))


def showGraphsPage(request,userID):
	#calories,carbs,fat,protein,sodium,sugar
	currentUser = User.objects.get(pk=userID)
	currentUsername = str(currentUser.username)
	age = Characteristics.objects.get(user=currentUser).age
	body_weight = Characteristics.objects.get(user=currentUser).body_weight

	calories = [x.amount for x in Calories.objects.filter(user=User.objects.get(pk=userID))]
	carbValues = [x.amount for x in Carbs.objects.filter(user=User.objects.get(pk=userID))]
	fatValues = [x.amount for x in Fats.objects.filter(user=User.objects.get(pk=userID))]
	proteinValues = [x.amount for x in Protein.objects.filter(user=User.objects.get(pk=userID))]
	sodiumValues = [x.amount for x in Sodium.objects.filter(user=User.objects.get(pk=userID))]
	sugarValues = [x.amount for x in Sugar.objects.filter(user=User.objects.get(pk=userID))]
	dates = [x.eaten_date for x in Calories.objects.filter(user=User.objects.get(pk=userID))]
#	currentDates = [datetime.strptime(str(x.eaten_date), '%Y-%m-%d %H:%M:%S+00:00').date() for x in Calories.objects.all()]
	return render(request, 'graphs/graphs.html',{'age':age,
												'body_weight': body_weight,
												'cal':calories,
												'carbs': carbValues,
												'fat':fatValues,
												'protein': proteinValues,
												'sodium': sodiumValues,
												'sugar': sugarValues,
												'dates': dates,
												'userID': userID,
												'username': currentUsername
												})

#----------------Tiff-----------------/\
#----------------Jacqui-----------------\/
def showScrapbookPage(request,userID):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
<<<<<<< HEAD
        #	user = User.objects.get(pk=userID)
            #m = Pictures(picture = request.FILES['image'],date = timezone.now(), caption = "") #
         #   m.model_pic = form.cleaned_data['image']
            #m.save()
            #if form.user.is_valid():
            	#form.user(user=request.user) #check
            form.save()
    scrapbook_gen = Pictures.objects
    url = Pictures.objects.filter(user=User.objects.get(pk=userID))
    #url = [x.picture.url.replace("fridge/static/", "") for x in Pictures.objects.all()]
    return render(request, 'scrapbook/scrapbook.html', {'scrapbook_gen':scrapbook_gen, 'url':url, 'form': ImageUploadForm(),'userID':userID})
=======
			user = User.objects.get(pk=userID)
			#m = Pictures(picture = request.FILES['image'],date = timezone.now(), caption = "") #
			#   m.model_pic = form.cleaned_data['image']
			#m.save()
			#if form.user.is_valid():
				#form.user(user=request.user) #check
			form.save()
	scrapbook_gen = Pictures.objects
	url = Pictures.objects.filter(user=User.objects.get(pk=userID))
	#url = [x.picture.url.replace("fridge/static/", "") for x in Pictures.objects.all()]
	return render(request, 'scrapbook/scrapbook.html', {'scrapbook_gen':scrapbook_gen, 'url':url, 'form': ImageUploadForm(),'userID':userID})
>>>>>>> 6c31dee79445a34baeca58a57532e45f03f0ec0d
   

class PhotoWizard(SessionWizardView):
	file_storage = FileSystemStorage(location = os.path.join(settings.MEDIA_ROOT, ''))
	def done(self, form_list, **kwargs):
		do_something_with_the_form_data(form_list)
		return HttpResponseRedirect('/page-to-redirect-to-when-done/')


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
def showShoppingPage(request,userID):
	itemslist = [(x.id, x.item) for x in ShoppingList.objects.filter(user=User.objects.get(pk=userID))]
	memolist = [(x.id, x.note) for x in ShoppingList.objects.filter(user=User.objects.get(pk=userID))]
	genlist = ShoppingList.objects.all()
	if len(ShoppingList.objects.filter(user=User.objects.get(pk=userID)))==0 or ShoppingList.objects.filter(user=User.objects.get(pk=userID))[0].id != 1:
		other = ShoppingList(item ='', note='', id=1,user=User.objects.get(pk=userID))
		other.save()
	else:
		other = ShoppingList.objects.get(id=1).note
	return render(request, 'shopping/shopping.html', {'genlist':genlist, 'other':other,'userID':userID})


def addItem(request):
	userID = request.POST['userID']
	try:
		Item = request.POST['ItemName']
		i = ShoppingList(item=Item,note=' ',user=User.objects.get(pk=userID))
		i.save();
	except:
		#nothing
		i=1
		raise
	else:
		return HttpResponseRedirect(reverse('fridge:showShopping',args=(userID,)))

def removeItem(request):
	userID = request.POST['userID']
	try:
		Item = request.POST['ItemId']
		i = ShoppingList.objects.get(id=Item,user=User.objects.get(pk=userID))
		i.delete();
	except:
		#nothing
		i=1
		raise
	else:
		return HttpResponseRedirect(reverse('fridge:showShopping',args=(userID,)))

def replaceItem(request):
	userID = request.POST['userID']
	try:
		NewItem = request.POST['NewItem']
		ItemId = request.POST["ItemId"]
		i = ShoppingList.objects.get(id=ItemId,user=User.objects.get(pk=userID))
		i.item = NewItem
		i.save()
	except:
		#nothing
		i=1
		raise
	else:
		return HttpResponseRedirect(reverse('fridge:showShopping',args=(userID,)))
		
def removeNote(request):
	userID = request.POST['userID']
	try:
		Note = request.POST['NoteId']
		i = ShoppingList.objects.get(id=Note,user=User.objects.get(pk=userID))
		i.note = ''
		i.save()
	except:
		#nothing
		i=1
		raise
	else:
		return HttpResponseRedirect(reverse('fridge:showShopping',args=(userID,)))

def replaceNote(request):
	userID = request.POST['userID']
	try:
		NewNote = request.POST['NewNote']
		NoteId = request.POST["NoteId"]
		i = ShoppingList.objects.get(id=NoteId,user=User.objects.get(pk=userID))
		i.note = NewNote
		i.save()
	except:
		#nothing
		i=1
		raise
	else:
		return HttpResponseRedirect(reverse('fridge:showShopping',args=(userID,)))
		
def genNote(request):
	userID = request.POST['userID']
	try:
		genNote = request.POST['other']
		i = ShoppingList.objects.get(id=1,user=User.objects.get(pk=userID))
		i.note = genNote
		i.save()
	except:
		#nothing
		i=1
		raise
	else:
		return HttpResponseRedirect(reverse('fridge:showShopping',args=(userID,)))
		
def addIngredientS(request):
	userID = request.POST['userID']
	IngName = request.POST['IngName']
	Id = request.POST['Id']
#	IngName.strip().lower();
	# IngAmount = float(request.POST['IngAmount'])
	i = Ingredient(user=User.objects.get(pk=userID), name=IngName,pic='search')
	i.save();
	a = ShoppingList.objects.get(id=Id, user=User.objects.get(pk=userID))
	a.delete()
	return HttpResponseRedirect(reverse('fridge:showShopping',args=(userID,)))
	
#----------------Rujia-----------------/\
