class RootController < ApplicationController

  def index
    @questions = SurveyQuestion.can_crosstab

    if request.post?
      # check to make sure row and col param is in list of questions
      if @questions.index{|x| x.code == params[:row]}.present? && @questions.index{|x| x.code == params[:col]}.present?
        @data = SurveyResult.crosstab_count(params[:row], params[:col])
      else
        #### DO SOMETHING?
      end
    end
    
    respond_to do |format|
      format.html # index.html.erb
    end
  end

end
