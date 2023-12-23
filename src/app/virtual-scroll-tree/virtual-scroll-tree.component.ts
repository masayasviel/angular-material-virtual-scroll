import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import data from './data.json';
import { NestedObjType, NestedObjExpandType, FlatObjType } from '../app.interface';

@Component({
  selector: 'app-virtual-scroll-tree',
  standalone: true,
  imports: [
    ScrollingModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './virtual-scroll-tree.component.html',
  styleUrl: './virtual-scroll-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualScrollTreeComponent {
  /** オリジナル */
  private readonly originalData: NestedObjType[] = data;
  /** 拡張 */
  protected expandData: NestedObjExpandType[];
  /** フラット */
  protected flattenData: FlatObjType[];

  constructor() {
    this.expandData = this.makeExpand(this.originalData);
    this.flattenData = this.updateVirtualScrollList();
  }

  /** 開閉 */
  changeExpand(target: FlatObjType): void {
    const parentSet = new Set<string>([target.id]);
    this.ExpandChange(target, this.expandData, parentSet);
    this.flattenData = this.updateVirtualScrollList();
  }

  /**
   * 開閉変更
   * @param target 選択されたノード
   * @param nodes 変更対象配列
   * @param parentSet 閉じられている親組織一覧
   */
  private ExpandChange(target: FlatObjType, nodes: NestedObjExpandType[], parentSet: Set<string>): void {
    if (nodes.length === 0) {
      return;
    }

    nodes.forEach((item) => {
      // 対象ノードの元データを開閉
      if (item.id === target.id) {
        item.expanded = !item.expanded;
      }
      // 閉じる場合
      if (target.expanded) {
        // 親組織を持っていれば対象組織の子組織も閉じる
        if (item.parentId && parentSet.has(item.parentId)) {
          item.expanded = false;
          parentSet.add(item.id);
        }
      }
      this.ExpandChange(target, item.children, parentSet);
    })
  }

  /** 拡張階層構造化 */
  private makeExpand(
    target: NestedObjType[],
    parent: NestedObjType | null = null
  ): NestedObjExpandType[] {
    if (target.length === 0) {
      return [];
    }
    return target.map((item) => ({
      id: item.id,
      name: item.name,
      parentId: parent?.id,
      expanded: false,
      hasChild: item.children.length > 0,
      children: this.makeExpand(item.children, item),
    }))
  }

  /** フラット化 */
  private makeFlat(
    target: NestedObjExpandType,
    level = 0
  ): FlatObjType[] {
    if (target.children.length === 0) {
      return [{
        id: target.id,
        name: target.name,
        parentId: target.parentId,
        expanded: target.expanded,
        hasChild: target.hasChild,
        level: level
      }]
    }
    return [
      {
        id: target.id,
        name: target.name,
        parentId: target.parentId,
        expanded: target.expanded,
        hasChild: target.hasChild,
        level: level
      },
      ...target.children.flatMap((item) => this.makeFlat(item, level+1))
    ];
  }

  /** バーチャルスクロールリストを再構成 */
  private updateVirtualScrollList(): FlatObjType[] {
    // 親が閉じている組織を全て除く
    const parentSet = new Set<string>();
    return this.expandData
      .flatMap((item) => this.makeFlat(item))
      .filter((item) => {
        if (!item.expanded) {
          parentSet.add(item.id);
        }
        return item.parentId === undefined || !parentSet.has(item.parentId);
      });
  }
}
