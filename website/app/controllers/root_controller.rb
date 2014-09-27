class RootController < ApplicationController

  def index
    @use_map = true
    
    @questions = SurveyQuestion.can_crosstab

    if request.post?
      # check to make sure row and col param is in list of questions
      if @questions.index{|x| x.code == params[:row]}.present? && @questions.index{|x| x.code == params[:col]}.present?
        @data = SurveyResult.crosstab_count(params[:row], params[:col])
        if @data[:map].present?
          gon.map_data = @data[:map]
        end
      else
        #### DO SOMETHING?
      end
    end
    
    respond_to do |format|
      format.html # index.html.erb
    end
  end

end
