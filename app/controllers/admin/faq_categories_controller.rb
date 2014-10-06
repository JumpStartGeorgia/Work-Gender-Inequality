class Admin::FaqCategoriesController < ApplicationController
  before_filter :authenticate_user!
  before_filter do |controller_instance|
    controller_instance.send(:valid_role?, User::ROLES[:content_editor])
  end

  # GET /faq_categories
  # GET /faq_categories.json
  def index
    @faq_categories = FaqCategory.sorted

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @faq_categories }
    end
  end

  # GET /faq_categories/1
  # GET /faq_categories/1.json
  def show
    @faq_category = FaqCategory.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @faq_category }
    end
  end

  # GET /faq_categories/new
  # GET /faq_categories/new.json
  def new
    @faq_category = FaqCategory.new

    # create the translation object for however many locales there are
    # so the form will properly create all of the nested form fields
    I18n.available_locales.each do |locale|
      @faq_category.faq_category_translations.build(:locale => locale.to_s)
    end

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @faq_category }
    end
  end

  # GET /faq_categories/1/edit
  def edit
    @faq_category = FaqCategory.find(params[:id])
  end

  # POST /faq_categories
  # POST /faq_categories.json
  def create
    @faq_category = FaqCategory.new(params[:faq_category])

    add_missing_translation_content(@faq_category.faq_category_translations)

    respond_to do |format|
      if @faq_category.save
        format.html { redirect_to admin_faq_category_path(@faq_category), notice: t('app.msgs.success_created', :obj => t('activerecord.models.faq_category')) }
        format.json { render json: @faq_category, status: :created, location: @faq_category }
      else
        format.html { render action: "new" }
        format.json { render json: @faq_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /faq_categories/1
  # PUT /faq_categories/1.json
  def update
    @faq_category = FaqCategory.find(params[:id])

    @faq_category.assign_attributes(params[:faq_category])

    add_missing_translation_content(@faq_category.faq_category_translations)

    respond_to do |format|
      if @faq_category.save
        format.html { redirect_to admin_faq_category_path(@faq_category), notice: t('app.msgs.success_updated', :obj => t('activerecord.models.faq_category')) }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @faq_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /faq_categories/1
  # DELETE /faq_categories/1.json
  def destroy
    @faq_category = FaqCategory.find(params[:id])
    @faq_category.destroy

    respond_to do |format|
      format.html { redirect_to admin_faq_categories_url }
      format.json { head :no_content }
    end
  end
end
