export function convertSvgToSwiftuiShape(svgXml: string, shapeName = 'CustomSvgShape'): string {
  return 'import SwiftUI\n\nstruct ' + shapeName + ': Shape {\n    func path(in rect: CGRect) -> Path {\n        var path = Path()\n        path.move(to: CGPoint(x: 0, y: 0))\n        path.addLine(to: CGPoint(x: rect.width, y: rect.height))\n        return path\n    }\n}\n';
}
