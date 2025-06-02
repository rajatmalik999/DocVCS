module.exports = {
  // ... other config options ...
  module: {
    rules: [
      // ... other rules ...
      {
        test: /\.(docx|doc)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'documents/'
            }
          }
        ]
      }
    ]
  }
}; 