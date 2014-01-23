from django.conf.urls import patterns, url
from fridge import views

urlpatterns = patterns('',
	#----------------Pav-----------------\/
    url(r'^$', views.index, name='index'),
    url(r'^fridge/', views.showFridge, name='appPage'),
    url(r'^addIngredient/',views.addIngredient,name='addIngredient'),
    url(r'^delIngredient/',views.delIngredient,name='delIngredient'),
    url(r'^getRecipes/',views.getRecipes,name='getRecipes'),
    # url(r'^(?P<datID>[-\w]+)/getRecipes/',views.getRecipes,name='getRecipes'),
    url(r'^addShopping/',views.addShopping,name='addShopping'),
    #----------------Pav-----------------/\
    #----------------Tiff-----------------\/
    url(r'^graphs/',views.showGraphsPage,name='showGraphs'),
    #----------------Tiff-----------------/\
    #----------------Jacqui-----------------\/
    url(r'^scrapbook/',views.showScrapbookPage, name='showScrapbook'),
    #url(r'^scrapbook/',views.addImage, name='addImage'),
    #if settings.DEBUG:
    # static files (images, css, javascript, etc.)

    #----------------Jacqui-----------------/\
    #----------------Rujia-----------------\/
    url(r'^shopping/',views.showShoppingPage, name='showShopping'),
    url(r'^addItem/', views.addItem, name='addItem'),
    url(r'^removeItem/', views.removeItem, name='removeItem'),
	url(r'^replaceItem/', views.replaceItem, name='replaceItem'), 
	url(r'^replaceNote/', views.replaceNote, name='replaceNote'),
	url(r'^removeNote/', views.removeNote, name='removeNote'),
	url(r'^genNote/', views.genNote, name='genNote'),
	url(r'^addIngredientS/', views.addIngredientS, name='addIngredientS'),


    #----------------Rujia-----------------/\
    
)
