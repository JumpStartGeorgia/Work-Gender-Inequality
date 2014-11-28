class Admin::StoriesController < ApplicationController
  before_filter :authenticate_user!
  before_filter do |controller_instance|
    controller_instance.send(:valid_role?, User::ROLES[:moderator])
  end

  # GET /stories
  # GET /stories.json
  def index
    @stories = Story.sorted

    @css.push('stories_admin.css')
    @js.push('stories_admin.js')

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @stories }
    end
  end

  # GET /stories/1
  # GET /stories/1.json
  def show
    @story = Story.find(params[:id])

    @css.push('stories_admin.css')
    @js.push('stories_admin.js')

    if request.post?
      if status
      else
      end
    end

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @story }
    end
  end

  def approve
    @story = Story.find(params[:id])
    respond_to do |format|
      format.json { 
        @story.moderator_status = Story::STATUS['approved']
        success = @story.save
        status = success == true ? :ok : :unprocessable_entity
        render json: {status: @story.moderator_status_name, success: success}.to_json, status: status
      }
     end
  end

  def deny
    @story = Story.find(params[:id])
    respond_to do |format|
      format.json { 
        @story.moderator_status = Story::STATUS['denied']
        success = @story.save
        status = success == true ? :ok : :unprocessable_entity
        render json: {status: @story.moderator_status_name, success: success}.to_json, status: status
      }
     end
  end

end
