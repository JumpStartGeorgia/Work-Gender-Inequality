class Admin::LawsController < ApplicationController
  before_filter :authenticate_user!
  before_filter do |controller_instance|
    controller_instance.send(:valid_role?, User::ROLES[:content_editor])
  end

  # GET /laws
  # GET /laws.json
  def index
    @laws = Law.sorted

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @laws }
    end
  end

  # GET /laws/1
  # GET /laws/1.json
  def show
    @law = Law.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @law }
    end
  end

  # GET /laws/new
  # GET /laws/new.json
  def new
    @law = Law.new

    # create the translation object for however many locales there are
    # so the form will properly create all of the nested form fields
    I18n.available_locales.each do |locale|
      @law.law_translations.build(:locale => locale.to_s)
    end

    # add the required assets
    @css.push("jquery.ui.datepicker.css")
    @js.push('jquery.ui.datepicker.js', 'laws.js')

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @law }
    end
  end

  # GET /laws/1/edit
  def edit
    @law = Law.find(params[:id])

    # add the required assets
    @css.push("jquery.ui.datepicker.css")
    @js.push('jquery.ui.datepicker.js', 'laws.js')

    # set the date values for the datepicker
    gon.enacted_at = @law.enacted_at.strftime('%m/%d/%Y') if @law.enacted_at.present?
  end

  # POST /laws
  # POST /laws.json
  def create
    @law = Law.new(params[:law])

    add_missing_translation_content(@law.law_translations)

    respond_to do |format|
      if @law.save
        format.html { redirect_to admin_law_path(@law), notice: t('app.msgs.success_created', :obj => t('activerecord.models.law')) }
        format.json { render json: @law, status: :created, location: @law }
      else
        # add the required assets
        @css.push("jquery.ui.datepicker.css")
        @js.push('jquery.ui.datepicker.js', 'laws.js')

        # set the date values for the datepicker
        gon.enacted_at = @law.enacted_at.strftime('%m/%d/%Y') if @law.enacted_at.present?

        format.html { render action: "new" }
        format.json { render json: @law.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /laws/1
  # PUT /laws/1.json
  def update
    @law = Law.find(params[:id])

    @law.assign_attributes(params[:law])

    add_missing_translation_content(@law.law_translations)

    respond_to do |format|
      if @law.save
        format.html { redirect_to admin_law_path(@law), notice: t('app.msgs.success_updated', :obj => t('activerecord.models.law')) }
        format.json { head :no_content }
      else
        # add the required assets
        @css.push("jquery.ui.datepicker.css")
        @js.push('jquery.ui.datepicker.js', 'laws.js')

        # set the date values for the datepicker
        gon.enacted_at = @law.enacted_at.strftime('%m/%d/%Y') if @law.enacted_at.present?

        format.html { render action: "edit" }
        format.json { render json: @law.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /laws/1
  # DELETE /laws/1.json
  def destroy
    @law = Law.find(params[:id])
    @law.destroy

    respond_to do |format|
      format.html { redirect_to admin_laws_url }
      format.json { head :no_content }
    end
  end
end
