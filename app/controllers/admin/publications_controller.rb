class Admin::PublicationsController < ApplicationController
  before_filter :authenticate_user!
  before_filter do |controller_instance|
    controller_instance.send(:valid_role?, User::ROLES[:content_editor])
  end

  # GET /publications
  # GET /publications.json
  def index
    @publications = Publication.sorted

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @publications }
    end
  end

  # GET /publications/1
  # GET /publications/1.json
  def show
    @publication = Publication.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @publication }
    end
  end

  # GET /publications/new
  # GET /publications/new.json
  def new
    @publication = Publication.new

    # create the translation object for however many locales there are
    # so the form will properly create all of the nested form fields
    I18n.available_locales.each do |locale|
      @publication.publication_translations.build(:locale => locale.to_s)
    end

    # add the required assets
    @css.push("jquery.ui.datepicker.css")
    @js.push('jquery.ui.datepicker.js', 'publications.js')

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @publication }
    end
  end

  # GET /publications/1/edit
  def edit
    @publication = Publication.find(params[:id])

    # add the required assets
    @css.push("jquery.ui.datepicker.css")
    @js.push('jquery.ui.datepicker.js', 'publications.js')

    # set the date values for the datepicker
    gon.published_at = @publication.published_at.strftime('%m/%d/%Y') if @publication.published_at.present?
  end

  # POST /publications
  # POST /publications.json
  def create
    @publication = Publication.new(params[:publication])

    add_missing_translation_content(@publication.publication_translations)

    respond_to do |format|
      if @publication.save
        format.html { redirect_to admin_publication_path(@publication), notice: t('app.msgs.success_created', :obj => t('activerecord.models.publication')) }
        format.json { render json: @publication, status: :created, location: @publication }
      else
        # add the required assets
        @css.push("jquery.ui.datepicker.css")
        @js.push('jquery.ui.datepicker.js', 'publications.js')

        # set the date values for the datepicker
        gon.published_at = @publication.published_at.strftime('%m/%d/%Y') if @publication.published_at.present?

        format.html { render action: "new" }
        format.json { render json: @publication.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /publications/1
  # PUT /publications/1.json
  def update
    @publication = Publication.find(params[:id])

    @publication.assign_attributes(params[:publication])

    add_missing_translation_content(@publication.publication_translations)

    respond_to do |format|
      if @publication.save
        format.html { redirect_to admin_publication_path(@publication), notice: t('app.msgs.success_updated', :obj => t('activerecord.models.publication')) }
        format.json { head :no_content }
      else
        # add the required assets
        @css.push("jquery.ui.datepicker.css")
        @js.push('jquery.ui.datepicker.js', 'publications.js')

        # set the date values for the datepicker
        gon.published_at = @publication.published_at.strftime('%m/%d/%Y') if @publication.published_at.present?

        format.html { render action: "edit" }
        format.json { render json: @publication.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /publications/1
  # DELETE /publications/1.json
  def destroy
    @publication = Publication.find(params[:id])
    @publication.destroy

    respond_to do |format|
      format.html { redirect_to admin_publications_url }
      format.json { head :no_content }
    end
  end
end
