class AddFinishedToGapPoll < ActiveRecord::Migration
  def change
    add_column :gap_polls, :finished, :boolean, :default => false
  end
end
