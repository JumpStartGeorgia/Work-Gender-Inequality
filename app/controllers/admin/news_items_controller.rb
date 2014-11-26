class Admin::NewsItemsController < ApplicationController
  before_filter :authenticate_user!
  before_filter do |controller_instance|
    controller_instance.send(:valid_role?, User::ROLES[:content_editor])
  end

  # GET /news_item
  # GET /news_items.json
  def index
    @news_items = NewsItem.sorted

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @news_items }
    end
  end

  # GET /news_item/1
  # GET /news_item/1.json
  def show
    @news_item = NewsItem.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @news_item }
    end
  end

  # GET /news_item/new
  # GET /news_item/new.json
  def new
    @news_item = NewsItem.new

    # create the translation object for however many locales there are
    # so the form will properly create all of the nested form fields
    I18n.available_locales.each do |locale|
      @news_item.news_item_translations.build(:locale => locale.to_s)
    end

    # add the required assets
    @css.push("jquery.ui.datepicker.css")
    @js.push('jquery.ui.datepicker.js', 'news_items.js')

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @news_item }
    end
  end

  # GET /news_item/1/edit
  def edit
    @news_item = NewsItem.find(params[:id])

    # add the required assets
    @css.push("jquery.ui.datepicker.css")
    @js.push('jquery.ui.datepicker.js', 'news_items.js')

    # set the date values for the datepicker
    gon.published_at = @news_item.published_at.strftime('%m/%d/%Y') if @news_item.published_at.present?
  end

  # POST /news_item
  # POST /news_items.json
  def create
    @news_item = NewsItem.new(params[:news_item])

    add_missing_translation_content(@news_item.news_item_translations)

    respond_to do |format|
      if @news_item.save
        format.html { redirect_to admin_news_item_path(@news_item), notice: t('app.msgs.success_created', :obj => t('activerecord.models.news_item')) }
        format.json { render json: @news_item, status: :created, location: @news_item }
      else
        # add the required assets
        @css.push("jquery.ui.datepicker.css")
        @js.push('jquery.ui.datepicker.js', 'news_items.js')

        # set the date values for the datepicker
        gon.published_at = @news_item.published_at.strftime('%m/%d/%Y') if @news_item.published_at.present?

        format.html { render action: "new" }
        format.json { render json: @news_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /news_item/1
  # PUT /news_item/1.json
  def update
    @news_item = NewsItem.find(params[:id])

    @news_item.assign_attributes(params[:news_item])

    add_missing_translation_content(@news_item.news_item_translations)

    respond_to do |format|
      if @news_item.save
        format.html { redirect_to admin_news_item_path(@news_item), notice: t('app.msgs.success_updated', :obj => t('activerecord.models.news_item')) }
        format.json { head :no_content }
      else
        # add the required assets
        @css.push("jquery.ui.datepicker.css")
        @js.push('jquery.ui.datepicker.js', 'news_items.js')

        # set the date values for the datepicker
        gon.published_at = @news_item.published_at.strftime('%m/%d/%Y') if @news_item.published_at.present?

        format.html { render action: "edit" }
        format.json { render json: @news_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /news_item/1
  # DELETE /news_item/1.json
  def destroy
    @news_item = NewsItem.find(params[:id])
    @news_item.destroy

    respond_to do |format|
      format.html { redirect_to admin_news_items_url }
      format.json { head :no_content }
    end
  end
end
