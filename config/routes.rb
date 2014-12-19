BootstrapStarter::Application.routes.draw do


	#--------------------------------
	# all resources should be within the scope block below
	#--------------------------------
	scope ":locale", locale: /#{I18n.available_locales.join("|")}/ do

		match '/admin', :to => 'admin#index', :as => :admin, :via => :get
		match '/admin/gamepoll', :to => 'admin#gamedata', :as => :gamedata, :via => :get, :defaults => { :format => 'csv' }
		devise_for :users, :path_names => {:sign_in => 'login', :sign_out => 'logout'},
											 :controllers => {:omniauth_callbacks => "omniauth_callbacks"}

		namespace :admin do
			post '/tinymce_assets', to: 'image_uploader#create', as: 'image_uploader'
		  resources :news_items
		  resources :publications
		  resources :laws
      resources :pages
			resources :users
		  resources :faq_categories
		  resources :faqs
		  resources :discrimination_types
	  	resources :stories, :only => [:index, :show, :update] do
	  		member do
		  		post 'approve', :defaults => { :format => 'json' }
		  		post 'deny', :defaults => { :format => 'json' }
	  		end
	  	end
		end

		match '/about', :to => 'root#about', :as => :about, :via => :get
		match '/explore_data', :to => 'root#explore_data', :as => :explore_data, :via => :get
		match '/faq', :to => 'root#faq', :as => :faq, :via => :get
		match '/laws/:id', :to => 'root#law', :as => :law, :via => :get
		match '/news', :to => 'root#news', :as => :news, :via => :get
		match '/news/:id', :to => 'root#news_show', :as => :news_show, :via => :get
		match '/publications', :to => 'root#publications', :as => :publications, :via => :get
		match '/publications/:id', :to => 'root#publications_show', :as => :publications_show, :via => :get

		get '/game', :to => 'gap#index', :as => 'gap'
		post '/game/poll', :to => 'gap#poll', :as => 'gap_poll'
		match '/game/share', :to => 'gap#share', :as => 'gap_share'
		get '/game/summary', :to => 'gap#summary', :as => 'gap_summary'		

  	resources :stories, :except => [:edit, :update, :destroy]

		root :to => 'root#index'
  	match "*path", :to => redirect("/#{I18n.default_locale}") # handles /en/fake/path/whatever
	  
	end
	
	match '', :to => redirect("/#{I18n.default_locale}") # handles /
	match '*path', :to => redirect("/#{I18n.default_locale}/%{path}") # handles /not-a-locale/anything

end
