class RootController < ApplicationController

  def index

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def faq
    @faq_categories = FaqCategory.sorted
    @faqs = Faq.sorted

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def explore_data
    @use_map = true
    
    # the questions for cross tab can only be those that have code answers
    @questions = SurveyQuestion.can_crosstab

    @filter_answers = SurveyAnswer.all

    row = @questions[0].code
    col = @questions[1].code
    @filter = nil
    # check to make sure row and col param is in list of questions
    if @questions.index{|x| x.code == params[:row]}.present? && @questions.index{|x| x.code == params[:col]}.present?
      row = params[:row]
      col = params[:col]
      # check for valid filter values
      if params[:filter_variable].present? && params[:filter_value].present? &&
        q_index = @questions.index{|x| x.code == params[:filter_variable]}
        a_index = @filter_answers.index{|x| x.code == params[:filter_variable] && x.value.to_s == params[:filter_value]}
        
        if q_index.present? && a_index.present?
          @filter = {code: params[:filter_variable], value: params[:filter_value], name: @questions[q_index].text, answer: @filter_answers[a_index].text }
        end       
      end
    end

    # get the data
    @data = SurveyResult.crosstab_count(row, col, @filter)

    if @data[:chart]
      gon.chart_data = @data[:chart][:data]
      gon.chart_labels = @data[:chart][:labels]
      gon.chart_title = build_chart_title(@data[:row_question], @data[:column_question], @filter, @data[:total_responses])
      gon.chart_col_label = @data[:column_question]
      gon.chart_row_label = @data[:row_question]
    end
    if @data[:map_percents].present?
      gon.map_percents = @data[:map_percents]
      gon.map_counts = @data[:map_counts]
      gon.map_filters = @data[:map_filters] # this is array of arrays: [[code, name], [code, name],...]
    end
  end
  
  respond_to do |format|
    format.html # index.html.erb
  end

private

  def build_chart_title(row, col, filter, total)
    title = t('root.explore_data.chart.title', :row => row, :col => col)
    if filter.present?
      title << t('root.explore_data.chart.title_filter', :variable => filter[:name], :value => filter[:answer] )
    end
    title << "<br /> <span class='total_responses'>("
    title << t('root.explore_data.chart.title_total', :num => total)
    title << ")</span>"
    return title.html_safe
  end 

end
