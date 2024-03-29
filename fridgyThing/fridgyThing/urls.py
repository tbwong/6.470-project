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

from django.conf import settings
if settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
        }),
        url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.STATIC_ROOT,
        }),
)
