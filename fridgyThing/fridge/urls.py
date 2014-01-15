from django.conf.urls import patterns, url

from fridge import views

urlpatterns = patterns('',
	#----------------Pav-----------------\/
    url(r'^$', views.index, name='index'),
    url(r'^app/', views.app, name='appPage'),
    url(r'^addIngredient/',views.addIngredient,name='addIngredient'),
    #----------------Pav-----------------/\
    #----------------Tiff-----------------\/
    url(r'^graphs/',views.showGraphsPage,name='showGraphs')
    #----------------Tiff-----------------/\
    #----------------Jacqui-----------------\/
    #----------------Jacqui-----------------/\
    #----------------Rujia-----------------\/
    #----------------Rujia-----------------/\
    
)