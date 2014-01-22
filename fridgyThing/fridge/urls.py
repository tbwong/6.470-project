from django.conf.urls import patterns, url
from fridge import views

urlpatterns = patterns('',
	#----------------Pav-----------------\/
    url(r'^$', views.index, name='index'),
    url(r'^fridge/', views.showFridge, name='appPage'),
    url(r'^addIngredient/',views.addIngredient,name='addIngredient'),
    #url(r'^getRecipes/',views.getRecipes,name='getRecipes'),
    #----------------Pav-----------------/\
    #----------------Tiff-----------------\/
    url(r'^graphs/',views.showGraphsPage,name='showGraphs'),
    #----------------Tiff-----------------/\
    #----------------Jacqui-----------------\/
    url(r'^scrapbook/',views.showScrapbookPage, name='showScrapbook'),
    #----------------Jacqui-----------------/\
    #----------------Rujia-----------------\/
    url(r'^shopping/',views.showShoppingPage, name='showShopping'),
    url(r'^addItem/', views.addItem, name='addItem'),
    url(r'^removeItem/', views.removeItem, name='removeItem'),
	url(r'^replaceItem/', views.replaceItem, name='replaceItem'), 
	url(r'^replaceNote/', views.replaceNote, name='replaceNote'),
	url(r'^removeNote/', views.removeNote, name='removeNote')

    #----------------Rujia-----------------/\
    
)
