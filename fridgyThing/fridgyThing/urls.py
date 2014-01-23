from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'fridgyThing.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    #----------------Pav-----------------\/
    url(r'^admin/', include(admin.site.urls)),
    url(r'^fridge/', include('fridge.urls', namespace='fridge')),
    #----------------Pav-----------------/\
    #----------------Tiff-----------------\/
    
    #----------------Tiff-----------------/\
    #----------------Jacqui-----------------\/
    
    #----------------Jacqui-----------------/\
    #----------------Rujia-----------------\/
    #----------------Rujia-----------------/\
)
