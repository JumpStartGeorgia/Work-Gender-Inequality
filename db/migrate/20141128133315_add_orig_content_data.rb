class AddOrigContentData < ActiveRecord::Migration
  def up
    Story.transaction do 
      Story.all.each do |story|
        story.original_content = story.content
        story.save
      end
    end
  end

  def down
    Story.update_all(original_content: nil)
  end
end
