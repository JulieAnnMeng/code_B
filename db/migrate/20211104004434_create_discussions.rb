class CreateDiscussions < ActiveRecord::Migration[6.1]
  def change
    create_table :discussions do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :topic
      t.string :discussion

      t.timestamps
    end
  end
end
