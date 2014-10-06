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
    
    @questions = SurveyQuestion.can_crosstab

    # check to make sure row and col param is in list of questions
    row = @questions[0].code
    col = @questions[1].code
    if @questions.index{|x| x.code == params[:row]}.present? && @questions.index{|x| x.code == params[:col]}.present?
      row = params[:row]
      col = params[:col]
    end

    @data = SurveyResult.crosstab_count(row, col)
    if @data[:chart]
      gon.chart_data = @data[:chart][:data]
      gon.chart_labels = @data[:chart][:labels]
      gon.chart_title = build_chart_title(@data[:row_question], @data[:column_question], @data[:total_responses])
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

  def build_chart_title(row, col, total)
    title = t('root.explore_data.chart.title', :row => row, :col => col)
    title << "<br /> <span class='total_responses'>("
    title << t('root.explore_data.chart.title_total', :num => total)
    title << ")</span>"
    return title.html_safe
  end 

end
