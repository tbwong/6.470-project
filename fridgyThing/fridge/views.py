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
 	ings = Ingredient.objects.filter(user=User.objects.get(pk=userID))
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
	recipeWeHaveIngs = []
	recipeIms = [] 
	recipeIds = []
	inFrjCount = []
	count=0
	for matches in matchSet:
		for match in matches:
			recipeNames.append(match['recipeName'][0:25]+'...')
			recipeIms.append(match['smallImageUrls'][0])
			recipeIds.append(match['id'])
			inFrjCounter = 0
			weHaveIngs = []
			print match['ingredients']
			print '----'
			for ing in ings:
				for s in match['ingredients']:
					if ing.name.lower() in s.lower():
						inFrjCounter=inFrjCounter+1
						weHaveIngs.append(s)
						match['ingredients'].remove(s)
			recipeWeHaveIngs.append(weHaveIngs)
			inFrjCount.append(inFrjCounter)
			recipeIngs.append(match['ingredients'])


	recipe = zip(recipeNames,recipeIngs,recipeIms,recipeIds,inFrjCount,recipeWeHaveIngs)
	recipe = sorted(recipe,key=lambda recipe:recipe[4],reverse=True)

	ingredients = Ingredient.objects.filter(user=User.objects.get(pk=userID))

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
	if (len(nutrition)>=6):
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
	height = request.POST['height']
	gender = request.POST['gender']

	try:
		user = User.objects.create_user(username, 'lennon@thebeatles.com', password)
		char = Characteristics(user=user,age=age,body_weight=weight,gender=gender,height=height)
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
	def sum(seq):
 		def add(x,y): 
 			return x+y
	   	return reduce(add, seq, 0)

	#calories,carbs,fat,protein,sodium,sugar
	currentUser = User.objects.get(pk=userID)
	currentUsername = str(currentUser.username)
	gender = Characteristics.objects.get(user=currentUser).gender
	age = Characteristics.objects.get(user=currentUser).age
	body_weight = Characteristics.objects.get(user=currentUser).body_weight
	height = Characteristics.objects.get(user=currentUser).height

	calories = [x.amount for x in Calories.objects.filter(user=User.objects.get(pk=userID))]
	carbValues = [x.amount for x in Carbs.objects.filter(user=User.objects.get(pk=userID))]
	fatValues = [x.amount for x in Fats.objects.filter(user=User.objects.get(pk=userID))]
	proteinValues = [x.amount for x in Protein.objects.filter(user=User.objects.get(pk=userID))]
	sodiumValues = [x.amount for x in Sodium.objects.filter(user=User.objects.get(pk=userID))]
	sugarValues = [x.amount for x in Sugar.objects.filter(user=User.objects.get(pk=userID))]
	dates = [str(x.eaten_date.date()) for x in Calories.objects.filter(user=User.objects.get(pk=userID))]

	calMessage = ""
	carbMessage = ""
	fatMessage = ""
	proteinMessage = ""
	sodiumMessage = ""
	sugarMessage = ""

	dailyCal = 0
	dailyCarb = 0
	dailyFat = 0
	dailyProtein = 0
	dailySodium = 0
	dailySugar = 0

	try:
		dailyCal = float(sum(calories))/len(calories)
		dailyCarb = float(sum(carbValues))/len(carbValues)
		dailyFat = float(sum(fatValues))/len(fatValues)
		dailyProtein = float(sum(proteinValues))/len(proteinValues)
		dailySodium = float(sum(sodiumValues))/len(sodiumValues)
		dailySugar = float(sum(sugarValues))/len(sugarValues)
	except ZeroDivisionError:
		dailyCal = 0
		dailyCarb = 0
		dailyFat = 0
		dailyProtein = 0
		dailySodium = 0
		dailySugar = 0


	# Men: BEE = (66.5 + 13.8(W) + 5.0(H) - 6.8(A) ) 1.2
	# Women: BEE =( 655.1 + 9.6(W) + 1.9(H) - 4.7(A)) * 1.2
	if gender == "female":
		if abs(dailyCal - (655.1 + 9.6*(body_weight/2.2) + 1.9*(height*2.54) - 4.7*age)*1.2) < 200:
			calMessage = "good range!"
		elif dailyCal - (655.1 + 9.6*(body_weight/2.2) + 1.9*(height*2.54) - 4.7*age)*1.2 < 0:
			calMessage = "not enough calories"
		else:
			calMessage = "too many calories"
	else:
		if abs(dailyCal - (66.5 + 13.8*(body_weight/2.2) + 5.0*(height*2.54) - 6.8*age)*1.2) < 200:
			calMessage = "good range!"
		elif dailyCal - (66.5 + 13.8*(body_weight/2.2) + 5.0*(height*2.54) - 6.8*age)*1.2 < 0:
			calMessage = "not enough calories"
		else:
			calMessage = "too many calories"
	
	#45 to 65 percent of your total daily calories come from carbohydrates.
	if dailyCarb < dailyCal * .45:
		carbMessage = "not enough carbs!"
	elif dailyCarb > dailyCal * .6:
		carbMessage = "too many carbs!"
	else:
		carbMessage = "just right~"


	#Fat intake should equal 30% of your total days calories. 
	if abs(dailyFat - dailyCal*.3) < 5:
		fatMessage = "good fat!"
	elif dailyFat - dailyCal*.3 < 0:
		fatMessage = "too much fat!"
	else:
		fatMessage = "too little fat!"


	#daily protein intake .8-1.0 g of protein/kg body weight. 
	if dailyProtein < body_weight / 2.2 * .8:
		proteinMessage = "not enough protein!"
	elif dailyProtein > body_weight / 2.2:
		proteinMessage = "too much protein!"
	else:
		proteinMessage = "just right protein!"

	#daily sodium should not be more than 2.3 grams
	if dailySodium > 2.3:
		sodiumMessage = "neeed FEWERE sodium"
	else:
		sodiumMessage = "AWWW YEAH good"

	if gender == 'female':
		if dailySugar > 20:
			sugarMessage = "NOOO STAHPPPP!"
		else:
			sugarMessage = "alll gooooood"
	else:
		if dailySugar > 36:
			sugarMessage = "don't doooo ittt"
		else:
			sugarMessage = ":D"

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
												'username': currentUsername,
												'calMessage': calMessage,
												'carbMessage': carbMessage,
												'fatMessage': fatMessage,
												'proteinMessage': proteinMessage,
												'sodiumMessage': sodiumMessage,
												'sugarMessage': sugarMessage
												})

#----------------Tiff-----------------/\
#----------------Jacqui-----------------\/
def showScrapbookPage(request,userID):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
			user = User.objects.get(pk=userID)
			print userID
			m = Pictures(picture = request.FILES['picture'],date = timezone.now(), caption = "",user=user)
         	# m.model_pic = form.cleaned_data['image']
			m.save()
            #if form.user.is_valid():
            	#form.user(user=request.user) #check
			# form.save()
    scrapbook_gen = Pictures.objects
    url = Pictures.objects.filter(user=User.objects.get(pk=userID))
    #url = [x.picture.url.replace("fridge/static/", "") for x in Pictures.objects.all()]
    return render(request, 'scrapbook/scrapbook.html', {'scrapbook_gen':scrapbook_gen, 'url':url, 'form': ImageUploadForm(),'userID':userID})

			#user = User.objects.get(pk=userID)
			#m = Pictures(picture = request.FILES['image'],date = timezone.now(), caption = "") #
			#   m.model_pic = form.cleaned_data['image']
			#m.save()
			#if form.user.is_valid():
				#form.user(user=request.user) #check
		

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
	if len(ShoppingList.objects.filter(user=User.objects.get(pk=userID)))==0 or ShoppingList.objects.filter(user=User.objects.get(pk=userID))[0].id != 1:
		other = ShoppingList(item ='', note='', id=1,user=User.objects.get(pk=userID))
		other.save()
	else:
		other = ShoppingList.objects.get(id=1).note
	itemslist = [(x.id, x.item) for x in ShoppingList.objects.filter(user=User.objects.get(pk=userID))]
	memolist = [(x.id, x.note) for x in ShoppingList.objects.filter(user=User.objects.get(pk=userID))]
	genlist = ShoppingList.objects.all()
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
