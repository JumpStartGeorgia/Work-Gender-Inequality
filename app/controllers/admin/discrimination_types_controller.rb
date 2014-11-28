class Admin::DiscriminationTypesController < ApplicationController
  before_filter :authenticate_user!
  before_filter do |controller_instance|
    controller_instance.send(:valid_role?, User::ROLES[:user_manager])
  end
  # GET /discrimination_types

  # GET /discrimination_types.json
  def index
    @discrimination_types = DiscriminationType.sorted

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @discrimination_types }
    end
  end

  # GET /discrimination_types/1
  # GET /discrimination_types/1.json
  def show
    @discrimination_type = DiscriminationType.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @discrimination_type }
    end
  end

  # GET /discrimination_types/new
  # GET /discrimination_types/new.json
  def new
    @discrimination_type = DiscriminationType.new

    # create the translation object for however many locales there are
    # so the form will properly create all of the nested form fields
    I18n.available_locales.each do |locale|
      @discrimination_type.discrimination_type_translations.build(:locale => locale.to_s)
    end

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @discrimination_type }
    end
  end

  # GET /discrimination_types/1/edit
  def edit
    @discrimination_type = DiscriminationType.find(params[:id])
  end

  # POST /discrimination_types
  # POST /discrimination_types.json
  def create
    @discrimination_type = DiscriminationType.new(params[:discrimination_type])

    add_missing_translation_content(@discrimination_type.discrimination_type_translations)

    respond_to do |format|
      if @discrimination_type.save
        format.html { redirect_to admin_discrimination_types_path, notice: t('app.msgs.success_created', :obj => t('activerecord.models.discrimination_type')) }
        format.json { render json: @discrimination_type, status: :created, location: @discrimination_type }
      else
        format.html { render action: "new" }
        format.json { render json: @discrimination_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /discrimination_types/1
  # PUT /discrimination_types/1.json
  def update
    @discrimination_type = DiscriminationType.find(params[:id])

    @discrimination_type.assign_attributes(params[:discrimination_type])

    add_missing_translation_content(@discrimination_type.discrimination_type_translations)

    respond_to do |format|
      if @discrimination_type.save
        format.html { redirect_to admin_discrimination_types_path, notice: t('app.msgs.success_updated', :obj => t('activerecord.models.discrimination_type')) }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @discrimination_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /discrimination_types/1
  # DELETE /discrimination_types/1.json
  def destroy
    @discrimination_type = DiscriminationType.find(params[:id])
    @discrimination_type.destroy

    respond_to do |format|
      format.html { redirect_to admin_discrimination_types_url }
      format.json { head :no_content }
    end
  end
end
