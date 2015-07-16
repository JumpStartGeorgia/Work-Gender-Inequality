class AddPubRandom < ActiveRecord::Migration
  def change
    add_column :publications, :random, :string
  end
end
