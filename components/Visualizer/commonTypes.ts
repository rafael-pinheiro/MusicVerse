import { BoxGeometry, CircleGeometry, ConeGeometry, CylinderGeometry, DodecahedronGeometry, EdgesGeometry, ExtrudeGeometry, IcosahedronGeometry, LatheGeometry, OctahedronGeometry, PlaneGeometry, PolyhedronGeometry, RingGeometry, ShapeGeometry, SphereGeometry, TetrahedronGeometry, TorusGeometry, TorusKnotGeometry, TubeGeometry, WireframeGeometry } from 'three';

export type Size = {
  width: number;
  height: number;
}
export type UpdateContext = {
  sound: {
    analysis?: {
      id: number;
      timbre: number[];
      pitches: number[];
      end: number;
    },
    position: number;
  },
};

export type Geometry = BoxGeometry
  | CircleGeometry
  | ConeGeometry
  | CylinderGeometry
  | DodecahedronGeometry
  | EdgesGeometry
  | ExtrudeGeometry
  | IcosahedronGeometry
  | LatheGeometry
  | OctahedronGeometry
  | PlaneGeometry
  | PolyhedronGeometry
  | RingGeometry
  | ShapeGeometry
  | SphereGeometry
  | TetrahedronGeometry
  | TorusGeometry
  | TorusKnotGeometry
  | TubeGeometry
  | WireframeGeometry;