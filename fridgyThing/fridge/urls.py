from django.conf.urls import patterns, url

from fridge import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^/app/$', views.app, name='appPage'),
)