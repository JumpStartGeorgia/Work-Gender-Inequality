class StoriesController < ApplicationController
  # GET /stories
  # GET /stories.json
  def index
    @stories = Story.sorted.is_approved.page(params[:page]).per(12)

    @css.push('stories.css')

    respond_to do |format|
      format.html # index.html.erb
      format.js 
      format.json { render json: @stories }
    end
  end

  # GET /stories/1
  # GET /stories/1.json
  def show
    @story = Story.is_approved.public.find(params[:id])

    @css.push('stories.css')

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @story }
    end
  end

  # GET /stories/new
  # GET /stories/new.json
  def new
    @story = Story.new

    @css.push('stories.css')

    @genders = [ [t('gender.F'), 'F'], [t('gender.M'), 'M'] ]

    @types = DiscriminationType.sorted.map{|x| [x.name, x.id]}

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @story }
    end
  end

  # GET /stories/1/edit
  # def edit
  #   @story = Story.find(params[:id])
  # end

  # POST /stories
  # POST /stories.json
  def create
    @story = Story.new(params[:story])

    respond_to do |format|
      if @story.save
        format.html { redirect_to stories_path, notice: @story.is_public? ? t('app.msgs.story_add_moderate_public') : t('app.msgs.story_add_moderate') }
        format.json { render json: @story, status: :created, location: @story }
      else
        @css.push('stories.css')
        @genders = [ [t('gender.F'), 'F'], [t('gender.M'), 'M'] ]
        @types = DiscriminationType.sorted.map{|x| [x.name, x.id]}

        format.html { render action: "new" }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  # # PUT /stories/1
  # # PUT /stories/1.json
  # def update
  #   @story = Story.find(params[:id])

  #   respond_to do |format|
  #     if @story.update_attributes(params[:story])
  #       format.html { redirect_to @story, notice: 'Story was successfully updated.' }
  #       format.json { head :no_content }
  #     else
  #       format.html { render action: "edit" }
  #       format.json { render json: @story.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # # DELETE /stories/1
  # # DELETE /stories/1.json
  # def destroy
  #   @story = Story.find(params[:id])
  #   @story.destroy

  #   respond_to do |format|
  #     format.html { redirect_to stories_url }
  #     format.json { head :no_content }
  #   end
  # end
end
